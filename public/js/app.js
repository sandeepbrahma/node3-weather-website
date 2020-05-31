
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {

//         if (data.error) {
//             console.log('error')
//         }

//         console.log('dataaa', data)


//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temperature = document.querySelector('#temperature')
const description = document.querySelector('#description')
const address = document.querySelector('#address')
const localtime = document.querySelector('#localtime')
// !const imageDesc = document.getElementById('myImg') !//
const imageDesc = document.querySelector('#myImg')





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(imageDesc)
    console.log(localtime)


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        // console.log(JSON.stringify(response))

        response.json().then((data) => {
            if (data.error) {
                console.log('..error..')
            } else {
                // console.log('Country ',data.address);
                // console.log('Current Temperature', data.temperature);
                // console.log('Current Local Time', data.localtime);
                // console.log('The  Current condition is ' , data.description[0]);

                temperature.textContent = 'Current temperature: ' + data.temperature
                address.textContent = 'Country: ' + data.address
                localtime.textContent = 'Local Time and Date: ' + data.localtime
                description.textContent = 'The  Current Forecast is: ' + data.description[0]
                const image = data.image

                imageDesc.src = image
                console.log(imageDesc.src)
            }
        })
    })


})

// fetch('localhost:3000/weather/?address=bostona');