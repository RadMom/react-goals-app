import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

//action function

export async function authAction({ request, params }) {
    const searchParams = new URL(request.url).searchParams; //URL is built-in URL constructor in the browser
    const mode = searchParams.get("mode") || "login";
    console.log(mode);

    if (mode !== "login" && mode !== "signup") {
        throw json(
            {
                message: "Unsupported mode",
            },
            { status: 422 }
        );
    }

    const data = await request.formData();
    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    const response = await fetch("http://localhost:8080/" + mode, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 402) {
        //We can return response here and react-router will extract the data for us
        return response;
    }

    if (!response.ok) {
        throw json(
            {
                message: "Could not authenticate user",
            },
            { status: 500 }
        );
    }

    const resData = await response.json();
    const token = resData.token;
    
    localStorage.setItem("token", token);

    return redirect("/");
}
