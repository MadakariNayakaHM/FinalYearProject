
const signup = async (name, email, phone, password, confirmPassword) => {
    try {
        console.log(name, email, phone, password, confirmPassword);
        const res = await axios({

            method: 'POST',
            url: '/api/v1/user/signup',
            data: {
                name, email, phone, password, confirmPassword
            }
        })

        window.alert("signup successfull")
    } catch (err) {
        // console.log(res);
        window.alert("signup failed")
    }
}
document.querySelector('form.rounded.bg-white.shadow.p-5').addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    //console.log(req);
    signup(name, email, phone, password, confirmPassword, location)

});



