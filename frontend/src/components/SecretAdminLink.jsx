import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../api';

const SecretAdminLink = () => {
    const { key } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Loading...");

    useEffect(() => {
        const getSecretToken = async () => {
            try {
                setStatus("Getting secret token...");
                console.log("Key:", key);
                
                if (!key) {
                    setStatus("No key provided");
                    setTimeout(() => navigate("/login"), 2000);
                    return;
                }

                const res = await api.get(`/api/auth/secret-token/${key}`);
                console.log("✅ Response:", res.data);
                
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    setStatus("Token set! Redirecting...");
                    setTimeout(() => navigate("/admin-dashboard"), 1000);
                } else {
                    setStatus("No token received");
                    setTimeout(() => navigate("/login"), 2000);
                }
            } catch (error) {
                console.error("❌ Secret token error:", error.response?.data || error.message);
                setStatus(`Error: ${error.response?.data?.message || error.message}`);
                setTimeout(() => navigate("/login"), 3000);
            }
        };

        getSecretToken();
    }, [key, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-white mt-4">{status}</p>
            </div>
        </div>
    );
};

export default SecretAdminLink;
