 const assert = require('assert')
 const name ='Kris'
const lastname = 'Roz'
const email ='zolina.kristina@gmail.com'
const pass ='Master123'


describe ('first test suit , https://proovitoo.devel73.aedes.ee/' , function (){

    before(() =>browser.url('https://proovitoo.devel73.aedes.ee/'));

    it('Nupp Loo konto peab töötama', function (){
        const looKontoLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(6) > a')
        looKontoLink.click()
        const titleOflooKonto = $('span.base').getText()
        assert(titleOflooKonto, 'Loo endale konto')

    })
    it(' Nuppu "Loo konto" funktsionaalsuse kontroll sissestamata andmetega',function (){
        const looKontoLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(6) > a')
        const  looKontoNupp = $('//form[@id="form-validate"]/div/div/button/span')
        looKontoLink.click()
        $('#btn-cookie-allow').click()
        looKontoNupp.click()
        browser.pause(2000)
        let error = $('#firstname-error')
        assert(error.isEnabled() , true)
    })
    // perekonna nimi sisestamata
    it(' Nuppu "Loo konto" funktsionaalsuse kontroll sissestamata isikliku andmetega',function () {
        const looKontoLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(6) > a')
        const looKontoNupp = $('//form[@id="form-validate"]/div/div/button/span')
        looKontoLink.click()
        $('#firstname').setValue('Kris');
        looKontoNupp.click()
        browser.pause(2000)
        let error = $('#lastname-error')
        assert(error.isEnabled(), true)
    })

    //vale email
    it(' Registreerimisel sisestatud vale email',function () {
        const looKontoLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(6) > a')
        const looKontoNupp = $('//form[@id="form-validate"]/div/div/button/span')
        looKontoLink.click()
        $('#firstname').setValue(name);
        $('#lastname').setValue(lastname);
        $('#email_address').setValue('zolina');
        looKontoNupp.click()
        browser.pause(2000)
        let error = $('#email_address-error')
        assert(error.isEnabled(), true)
        if(!$('#email_address').getValue().includes('@') && !$('#email_address').getValue().includes('.')){
            assert(error.getText(), 'Palun sisesta kehtiv e-kirja aadress (Nt: johndoe@domain.com).')
        }
    })

    it(' Registreerimisel sisestatud  salasõna <8 märki' ,function () {
        const looKontoLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(6) > a')
        const looKontoNupp = $('//form[@id="form-validate"]/div/div/button/span')
        looKontoLink.click()
        $('#firstname').setValue(name);
        $('#lastname').setValue(lastname);
        $('#email_address').setValue(email);
        $('#password').setValue('master1');
        let passLength = $('#password').getValue().length
        looKontoNupp.click()
        browser.pause(2000)
        let error = $('#password-error')
        assert(error.isEnabled(), true)
        if(passLength<8){
            assert(error.getText(), 'Sellele väljale tuleb sisestada vähemalt 8 sümbolit. Algusesse ja lõppu lisatud tühikud ignoreeritakse.')
        }
    })
    it(' Registreerimisel sisestatud  korduv salasõna on teine ' ,function () {
        const looKontoLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(6) > a')
        const looKontoNupp = $('//form[@id="form-validate"]/div/div/button/span')
        looKontoLink.click()
        $('#firstname').setValue(name);
        $('#lastname').setValue(lastname);
        $('#email_address').setValue(email);
        $('#password').setValue('Master123');
        $('#password-confirmation').setValue('master12');
        let pass = $('#password').getValue()
        let confirmpass=  $('#password-confirmation').getValue()
        looKontoNupp.click()
        browser.pause(2000)
        let error = $('#password-confirmation-error')
        assert(error.isEnabled(), true)
        if(pass != confirmpass){
            assert(error.getText(), 'Sisesta sama väärtus uuesti.')
            console.log("Vale korduv salasõna")
        }
    })

    it(' Registreerimisel sisestatud  õiged andmed ' ,function () {
        const looKontoLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(6) > a')
        const looKontoNupp = $('//form[@id="form-validate"]/div/div/button/span')
        looKontoLink.click()
        $('#firstname').setValue(name);
        $('#lastname').setValue(lastname);
        $('#email_address').setValue(email);
        $('#password').setValue(pass)
        $('#password-confirmation').setValue(pass);
        looKontoNupp.click()
        browser.pause(2000)
        const pageTitle = $('#maincontent > div.page-title-wrapper > h1 > span').getText()
        assert(pageTitle,'Minu konto')
        const tervitus = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.greet.welcome > span').getText()
        console.log(tervitus)
        assert(tervitus,'Tere, Kris Roz!')
    })
    it(' Kasutaja kontroll baasis' ,function () {
        browser.url('https://proovitoo.devel73.aedes.ee/haldus')
        $('#username').setValue('Testuser');
        $('#login').setValue('Test1234');
        $('//form[@id="login-form"]/fieldset/div[3]/div/button/span').click();
        if($('#html-body > div.modals-wrapper > aside.modal-popup.modal-system-messages._show > div.modal-inner-wrap > header > button').isEnabled()){  //Incoming message
            $('#html-body > div.modals-wrapper > aside.modal-popup.modal-system-messages._show > div.modal-inner-wrap > header > button').click();
        }
        const custumerNupp = $('#menu-magento-customer-customer')
        custumerNupp.click()
        const allCustumersNupp= $('#menu-magento-customer-customer > div > ul > li.item-customer-manage.level-1 > a')
        allCustumersNupp.click()
        browser.pause(3000)
        const searchbyKeyword = $('#fulltext')
        const filters =$("#container > div > div.admin__data-grid-header > div:nth-child(1) > div.admin__data-grid-filters-current._show > div.admin__current-filters-list-wrap > ul > li > button")

            if(filters.isEnabled()){
                filters.click()
            }
        searchbyKeyword.setValue(email)
        const customersEmails = $('#container > div > div.admin__data-grid-wrap > table > tbody > tr.data-row > td:nth-child(4)').getText()
        assert(customersEmails,email)

})

    })

 describe ('Sisse logimine test suit , https://proovitoo.devel73.aedes.ee/' , function (){

     before(() =>browser.url('https://proovitoo.devel73.aedes.ee/'));

     it('Nupp Logi sisse nupp peab töötama', function () {
         const logiSisseLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a')
         logiSisseLink.click()
         const titleOfLogisisse = $('span.base').getText()
         console.log("Title" + titleOfLogisisse)
         assert(titleOfLogisisse, 'Kontohaldus')

     })
     it(' Sisse logimine  kontroll vale emailiga', function () {
         const logiSisseLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a')
         logiSisseLink.click()
         $('#email').setValue('kkk');
         $('//button[@id="send2"]/span').click();
         let error = $('#email-error')
         assert(error.isEnabled(),true)
         assert(error.getText(),'Palun sisesta kehtiv e-kirja aadress (Nt: johndoe@domain.com).')



     })
     it(' Sisse logimine  kontroll vale parooliga', function () {
         const logiSisseLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a')
         logiSisseLink.click()
         $('#email').setValue(email);
         $('#pass').setValue("jjjjj")
         $('//button[@id="send2"]/span').click();
         browser.pause(10000)
         let error = $('#maincontent > div.page.messages > div:nth-child(2) > div > div > div')
         assert(error.isEnabled(),true)
         assert(error.getText(),'Sisselogimise andmed olid valed või teie konto on ajutiselt deaktiveeritud. Palun oota ja proovi hiljem uuesti.')


     })

     it(' Sisse logimine  õige andmetega', function () {
         const logiSisseLink = $('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a')
         logiSisseLink.click()
         $('#email').setValue(email);
         $('#pass').setValue(pass)
         $('//button[@id="send2"]/span').click();
         browser.pause(10000)
         const titleOfLogisisse = $('span.base').getText()
         console.log("Title" + titleOfLogisisse)
         assert(titleOfLogisisse, 'Minu konto')

     })
 })