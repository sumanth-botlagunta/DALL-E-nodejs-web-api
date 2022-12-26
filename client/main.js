const form = document.querySelector('form');

const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const promptvalue = data.get('prompt');
    const sizevalue = data.get('size');

    console.log(promptvalue, sizevalue);

    document.querySelector('#image').src = "./assets/loading.gif";
    document.querySelector('#image').style.border = "#fff 1px solid";
    document.querySelector('#image').style.borderRadius = "5px";
    document.querySelector('.msg').textContent = "";

    getImagefromapi(promptvalue, sizevalue);
    form.reset();
}

const getImagefromapi = async (prompt, size) => {
    try {
        const response = await fetch("https://dallenodeapi.onrender.com/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                size: size
            })
        })

        if (response.ok) {
            const jsondata = await response.json();
            document.querySelector('#image').src = jsondata.data;
        } else {
            document.querySelector('msg').textContent = "Failed to get image";
        }
    } catch (e) {
        document.querySelector('msg').textContent = "Failed to get image";
        console.log("error from the catch block", e);
    }
};

const button = document.getElementById('submitbutton');
button.addEventListener('click', onSubmit);
