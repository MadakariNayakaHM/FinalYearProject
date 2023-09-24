const signup = async (email, password) => {
    try {
        console.log(email, password);
        const res = await axios({

            method: 'POST',
            url: '/api/v1/user/login',
            data: {
                email, password
            }
        })

        window.alert("signup successfull")
    } catch (err) {
        // console.log(res);
        window.alert("signup failed")
    }
}
document.querySelector('form.rounded.bg-white.shadow.py-5.px-4').addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //console.log(req);
    signup(email, password)

});
