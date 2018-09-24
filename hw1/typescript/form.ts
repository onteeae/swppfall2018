class Form {
    constructor(
        public email: string,
        public password: string,
        public password_confirmation: string,
        public phone_number: string,
        public fname: string,
        public lname: string,
        public age: number,
        public birth_month: string,
        public birth_day: number,
        public birth_year: number) {}
    // TODO: You may fill in functions in the class.
    checkLabel(check, id,message){
        var label = document.getElementById(id)
        if (!check) {
            label.innerText = "X"
            label.hidden = false
            label.title = message
        }
        else label.hidden = true
    }
    validateEmail() {
        //var regex = new RegExp("^[^@\s]+@[^@\.\s]+\.[a-z]{2,3}$")
        var regex = new RegExp("^[^@\s]+@[^@\.\s]+\.[a-z]{2,3}$")
        var check = regex.test(this.email)
        this.checkLabel(check,'email-label','characters@characters.domain ' +
            '(characters other than @ or whitespace followed by an @ sign, ' +
            'followed by more characters (not \'@\', \'.\', or whitespace: ' +
            'co.kr is not allowed in this case), and then a ".". After the ".", ' +
            'you can only write 2 to 3 letters from a to z).')
        return check
    }
    validatePassword(){
        var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$")
        var check =  regex.test(this.password)
        this.checkLabel(check,'password-label','Must contain at least one number ' +
            'and one uppercase and one lowercase letter, and at least 8 or more characters.')
        return check
    }
    validatePasswordConfirmation(){
        var check =  this.password == this.password_confirmation
        this.checkLabel(check,'password-confirmation-label','Must match password.')
        return check
    }
    validatePhoneNumber(){
        var regex = new RegExp("^[0-9]{3}-[0-9]{4}-[0-9]{4}$")
        var check =  regex.test(this.phone_number)
        this.checkLabel(check,'phone-number-label','nnn-nnnn-nnnn: three numbers, then "-", ' +
            'followed by four numbers and a "-", then four numbers.')
        return check
    }
    validateFirstName(){
        var regex = new RegExp("^[A-Z][a-z]+$")
        var check =  regex.test(this.fname)
        this.checkLabel(check,'fname-label','Start with a capital letter, followed by one or more ' +
            'lowercase letters. Should only contain alphabets (A-Z, a-z)')
        return check
    }
    validateLastName(){
        var regex = new RegExp("^[A-Z][a-z]+$")
        var check =  regex.test(this.lname)
        this.checkLabel(check,'lname-label','Start with a capital letter, followed by ' +
            'one or more lowercase letters. Should only contain alphabets (A-Z, a-z)')
        return check
    }
    validateAge(){
        var check =  this.age>=0&&this.age<=200
        this.checkLabel(check,'age-label','Must be a number between 0 and 200 (inclusive).')
        return check
    }
    validateMonth(){
        let months : string[] = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"]
        var month = this.birth_month
        var check = false
        for(var i=0; i<months.length; i++){
            if(months[i]==month){
                check = true
                break
            }
        }
        this.checkLabel(check,'birth-month-label',' Must be one of "January", "February", ..., "December"')
        return check
    }
    validateDay(){
        var check =  this.birth_day>=0&&this.birth_day<=99
        this.checkLabel(check,'birth-day-label','Must be a number of one or two digits.')
        return check
    }
    validateYear(){
        var check =  this.birth_year>=1800&&this.birth_year<=2018
        this.checkLabel(check,'birth-year-label','Must be a number between 1800 and 2018 (inclusive).')
        return check
    }
    Validate(){
        let problems : string[] = []
        if(!this.validateEmail()) problems.push("Email")
        if(!this.validatePassword()) problems.push("Password")
        if(!this.validatePasswordConfirmation()) problems.push("Password Confirmation")
        if(!this.validatePhoneNumber()) problems.push("Phone number")
        if(!this.validateFirstName()) problems.push("First name")
        if(!this.validateLastName()) problems.push("Last name")
        if(!this.validateAge()) problems.push("Age")
        if(!this.validateMonth()) problems.push("Month")
        if(!this.validateDay()) problems.push("Day")
        if(!this.validateYear()) problems.push("Year")
        return problems
    }
}

var but = document.createElement('button')
but.innerHTML = "Check"
but.onclick = function() {
    var email : string = document.forms["form"]["email"].value
    var password : string = document.forms["form"]["password"].value
    var password_confirmation : string = document.forms["form"]["password-confirmation"].value
    var phone_number: string =document.forms["form"]["phone-number"].value
    var fname: string = document.forms["form"]["fname"].value
    var lname: string = document.forms["form"]["lname"].value
    var age: number = document.forms["form"]["age"].value
    var birth_month: string = document.forms["form"]["birth-month"].value
    var birth_day: number = document.forms["form"]["birth-day"].value
    var birth_year: number = document.forms["form"]["birth-year"].value
    // TODO: Fill in the rest of the function. Use the Form class defined above
    var form : Form = new Form(email,password,password_confirmation,phone_number,fname,lname,age,birth_month,birth_day,birth_year)
    let alertMessage = ''
    var problems : string[] = form.Validate()
    if(problems.length==10) alertMessage = 'Successfully Submitted!'
    else{
        alertMessage = 'You must correct:\n'
        for(var i=0; i<problems.length; i++){
            alertMessage +='\n'+problems[i]
        }
    }
    // TODO: Fill the alert message according to the validation result by following the form in README.md.
    alert(alertMessage);

    // Hint: you can use the RegExp class for matching a string with the `test` method.
    // Hint: you can set contents of elements by finding it with `document.getElementById`, and fixing the `innerHTML`.
    // Hint: modify 'title' attribute of each label to display your message
    // Hint: Ask Google to do things you don't know yet! There should be others who have already done what you are to encounter.
}
document.body.appendChild(but)
