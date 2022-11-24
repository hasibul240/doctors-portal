import { useEffect, useState } from "react";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://doctors-portal-server-two-phi.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setIsAdmin(data.isAdmin);
                        setAdminLoading(false);
                    };
                });
        }
    }, [email]);
    return [isAdmin, adminLoading];

};

export default useAdmin;