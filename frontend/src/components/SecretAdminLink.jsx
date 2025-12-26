import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../api';

const SecretAdminLink = () => {
    const { key } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getSecretToken = async () => {
            try {
                const res = await api.get(`/api/auth/secret-token/${key}`);
                localStorage.setItem("token", res.data.token);
                console.log("✅ Secret token obtained! Redirecting to dashboard...");
                navigate("/admin-dashboard");
            } catch (error) {
                console.error("Secret token error:", error);
                navigate("/login");
            }
        };

        if (key) {
            getSecretToken();
        }
    }, [key, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-white mt-4">Accessing Admin Dashboard...</p>
            </div>
        </div>
    );
};

export default SecretAdminLink;
