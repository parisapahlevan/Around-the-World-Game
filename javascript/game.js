const COUNTRIES       = ["Albania", "Algeria","Angola","Anguilla","Antarctica","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia","Herzegovina","Botswana","Brazil","Bulgaria","Cambodia","Cameroon","Canada","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Denmark","Djibouti","Dominica","Ecuador","Egypt","El Salvador","Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea","Kuwait","Kyrgyzstan","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Nicaragua","Niger","Nigeria","Niue","Norway","Oman","Pakistan","Palau","Palestine","Panama","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","RWANDA","Samoa","San Marino","Saudi Arabia","Senegal","Montenegro","Seychelles","Singapore","Slovakia","Slovenia","Somalia","South Africa","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tokelau","Tonga","Trinidad","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands","Yemen","Zambia","Zimbabwe"]
const DEFAULT_CHANCES = 30
var country            = []
var userAnswerArr      = []
var userChancesCounter = 0
var userInputLetter    = ''
var fullCountryName    = ''

function resetAllPreviousVariables(){
    country            = []
    userAnswerArr      = []
    userChancesCounter = 0
    userInputLetter     = ''
    fullCountryName    = ''
}

function neededLetters () {
    console.log("country : ", country)
    var emptyElements = 0
    for (let i = 0; i < country.length; i++) {
        if(country[i] == null){
            emptyElements++
        }
    }
    console.log("emptyElements : ", emptyElements)
    return country.length - emptyElements
}

function createUserAnswerArr(){
    for (let i = 0; i < country.length; i++) {
        userAnswerArr.push(' _ ')        
    }
}

function pickACountry(){
    fullCountryName = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].toUpperCase()
    country = fullCountryName.split('')
}

function setUserChangesInThisGame(){
    userChancesCounter = DEFAULT_CHANCES
}

function displaySecret(){
    $("#country").html(userAnswerArr.join(""))
}

function displayNumberOfChances(){
    $("#userChancesCounter").html(userChancesCounter)
}

function decrementUserChances(){
    $("#userChancesCounter").html(userChancesCounter--)
}

function getUserInput(){
    userInputLetter = document.getElementById("userInputLetter").value.toUpperCase()
}

function resetUserInput(){
    document.getElementById("userInputLetter").value = ''
}

function getUserInputIndex(){
    return country.indexOf(userInputLetter)
}

function userWins(){
    return (userGuessedAllLetters())
}

function userGuessedAllLetters(){
    return (country.every((elem) => elem === null) && country.length != 0) 
}

function depletedYourChances(){
    console.log("neededLetters: ",neededLetters())
    return (userChancesCounter < neededLetters() || userChancesCounter < fullCountryName.length)
}

function userLost(){
    return (userChancesCounter === 0 || depletedYourChances())
}

function congratulateUser() {
    alert(" CONGRATULATIONS YOU MADE IT !!")
}

function reconciliate(){
    alert(` SORRY YOU LOST \n The country was:  ${fullCountryName.toUpperCase()}`)
}

function endGame (){
    location.reload();
}

function rebuildSecret(i){
    userAnswerArr[i] = country[i]
    delete country[i]
}
//------------------------------------------------------------------------ MAIN FUNCTIONS 
function startTheGame() {
    resetAllPreviousVariables()
    setUserChangesInThisGame();
    pickACountry();
    createUserAnswerArr();
    displaySecret();
    displayNumberOfChances();
}

function checkAnswer() {
    decrementUserChances();
    getUserInput();
    resetUserInput();
    var inputIndex = getUserInputIndex()
    if( inputIndex !== -1){
        rebuildSecret(inputIndex)
        displaySecret()
    }
}

function checkGameStatus(){
    if(userWins()){ 
        congratulateUser();
        endGame();
    }
    if(userLost()){
        reconciliate();
        endGame();
    }
}