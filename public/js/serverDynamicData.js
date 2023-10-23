const sendDynamicServerData = async () => {
    try {
        console.log(email, password);
        const res = await axios({

            method: 'POST',
            url: '/api/v1/server/',
            data: {
                email, password
            }
        })


        if (res.data.status === "success") {
            window.alert("login successfull")
            window.setTimeout(() => {
                location.assign('/home')
            }, 500)
        }

    } catch (err) {
        console.log(err);
        window.alert("login failed")
    }
}
const logout = async () => {
    try {

        const res = await axios({
            method: "GET",
            url: "/api/v1/user/logout",

        });
        console.log(res);
        if (res.data.status === "success") {
            window.alert("logedout successfully")
            window.setTimeout(() => {
                location.assign('/home')
            }, 100)
        }
    } catch (err) {
        console.log(err);
        window.alert("error logging out")
    }
}


const logoutButton = document.querySelector('.logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', e => {
        e.preventDefault();
        logout();
    });
}





