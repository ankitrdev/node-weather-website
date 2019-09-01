console.log('Client side javascrpit is loaded');

url = 'http://puzzle.mead.io/puzzle'

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const address = searchInput.value;

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

        fetch('/weather?address=%22'+address+'%22').then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    console.log(data.error);
                    messageOne.textContent = data.error;
                } else{
                    console.log(data.address);
                    console.log(data.forecast);
                    messageOne.textContent = data.address;
                    messageTwo.textContent = data.forecast;

                }
            })
        })

})