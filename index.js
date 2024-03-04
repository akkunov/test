const userContainer = document.querySelector('.user__container'),
    searchInput = document.querySelector('#filterinput');
    reload = document.querySelector('#reload');
const filterMenu = document.querySelector('.user__filter'),
    filterButton= filterMenu.querySelector('.user__filter_button'),
    options= filterMenu.querySelector('.options'),
    filterOptions =filterMenu.querySelectorAll('.user__filter__text')




const debounceOnChange = debounce(function(e) {
    const value =e.target.value
    fetchFilteredUsers(value)
}, 300)
filterButton.onclick = toggleFilter
filterOptions.forEach((option) => {
    option.onclick= (e) => {
        const selectedFilter = e.target.outerText
        filterButton.value = selectedFilter
        users = useSort(users,selectedFilter)
        renderUsers(users)
        toggleFilter()
    }
    console.log(option)

})
searchInput.addEventListener('input' ,debounceOnChange)
reload.onclick = () => fetchUser()


let users = []
async function fetchUser  () {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
        users =  await response.json()
        renderUsers(users)
    }catch (e){
        users.error = 'Ошибка сервера'
        console.log(e, 'Ошибка загрузки польвателей!')
        errorORenders()
    }
}
async function fetchFilteredUsers  (filterParam)  {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?$name=%${filterParam}%`);
        if (!response.ok) {
            throw new Error('Ошибка загрузки пользователей');
        }
        users = await response.json();
        renderUsers(users)
    } catch (e) {
        users.error = 'Ошибка сервера'
        console.log(e, 'Ошибка загрузки польвателей!')
        errorORenders()
    }
};

function toggleFilter() {
    options.classList.toggle('active');
}
function useSort (array, sortProp)  {
    return array.sort((a, b) => {
        if (a[sortProp] < b[sortProp]) {
            return -1;
        }
        if (a[sortProp] > b[sortProp]) {
            return 1;
        }
        return 0;
    });
}
function debounce(func, delay) {
    let timeoutId;

    return function() {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}


const renderUsers = (users) => {
    console.log('1')
    userContainer.innerHTML = '';
    users.map((user, index) =>{
        const div  = document.createElement('div')
        div.classList.add('user');
        div.innerHTML = userCard(user)
        userContainer.appendChild(div);
    })
}
const errorORenders = () => {
    const div  = document.createElement('div')
    div.innerText = 'Ошибка загрузки польвателей!';
    userContainer.appendChild(div);
}
const userCard =(props) => {
    const {name,email} = props

    return ` <div class="card">
            <div class="card__image">
            </div>
            <div class="card__content">
                <div class="card__name">${name}</div>
                <div class="card__description">${email}</div>
            </div>
        </div>`
}


fetchUser()
