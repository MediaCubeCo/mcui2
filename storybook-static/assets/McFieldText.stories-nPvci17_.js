import{_ as e,I as d,A as E}from"./McFieldText-CElXFiE9.js";import{D as m}from"./McSvgIcon-Cq4_nq1C.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./McTitle-BRys2FLH.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";import"./McButton-Cw3_qabT.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./McTooltip-CnE_6JSP.js";import"./Spaces-DiQ1o4ZA.js";import"./useFieldErrors-_2MdWRxY.js";import"./index-BmsK2qgO.js";import"./Alignment-5IJBP4cy.js";import"./Weights-CEN83Yli.js";import"./Sizes-ByFfI8jG.js";const re={title:"McFieldText",component:e,tags:["autodocs"],argTypes:{type:{control:"select",options:d},disabled:{control:"boolean"},copy:{control:"boolean"},readOnly:{control:"boolean"},isMobile:{control:"boolean"},required:{control:"boolean"},clearOutput:{control:"boolean"},modelValue:{control:"none"},dir:{control:"select",options:m},title:{control:"text"},helpText:{control:"text"},mask:{control:"text"},placeholder:{control:"text"},name:{control:"text"},autocomplete:{control:"select",options:E},tabindex:{control:"number"},maxDecimals:{control:"number"},locale:{control:"text"},maxLength:{control:"number"}},args:{disabled:!1,copy:!1,readOnly:!1,isMobile:!1,required:!1,clearOutput:!1,type:d.Text,dir:m.Ltr,title:"McFieldText",helpText:"Help text",errors:["Error text"],placeholder:"McFieldText placeholder",name:"McFieldText name",autocomplete:"off",tabindex:0,maxDecimals:2,maxLength:255,locale:"en"},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280"}}},t={args:{name:"Default"}},n={render(){return{components:{McFieldText:e},data(){return{v:`User verification (KYC)
The KYC (Know Your Customer) procedure is a process of confirming (verifying) an identity using scans or photos of official documents.
According to generally accepted international standards, only verified users can conduct any transactions with money. Most often, to pass KYC, you need to upload documents confirming your identity and address of residence. This ensures companies that they’re not dealing with scammers, and users do not doubt the safety of their funds.
The KYC procedure is used by banks, exchanges, payment systems, and financial platforms.
Why is there KYC in MC Pay
MC Pay allows you to fully manage your income, keep money on your balance, withdraw it using convenient payment methods, and transfer it to other users. Therefore, in accordance with international practice, we must make the KYC procedure mandatory for our users.
Verification guarantees the security of all financial transactions. Thanks to KYC, we know for sure that we are paying money to the rightful owner of the account, and you can feel secure about the safety of your earnings. Only verified users can withdraw and transfer money.`}},template:`
                <mc-field-text v-model="v" type="textarea" title="McFieldText" placeholder="Placeholder" name="Textarea" />
            `}}},o={render(){return{components:{McFieldText:e},data(){return{v:`Two-factor authentication (2FA)
MC Pay is an advanced financial management solution. Your account stores your money, personal data, and transaction information. To ensure security, we have developed strong profile protection. All users must verify their email, pass KYC verification, and enable two-factor authentication (2FA).
What is 2FA
Two-factor authentication is one of the most reliable and modern ways to protect your profile. When logging in after entering a password, the user goes through another verification step. That is, they additionally confirm that they are the owner of the account.
Most often, in addition to the password, you need to specify a secret one-time code. It is obtained through:
- SMS messages,
- email,
- code generation apps,
- hardware generators,
- pre-created code lists.
The main task of 2FA is to protect data from cybercriminals. To log into an account, scammers need to get access not only to the password, but also to the phone, email, or list of codes. And this is almost impossible. Therefore, payment systems, large banks, and serious services are increasingly implementing 2FA.
2FA in MC Pay
Once 2FA is enabled, you need to confirm your account login in two ways. The first is entering a password or authorization through a social network. The second is entering the secret code from the SMS that we send to your phone number. Without access to the phone, it is impossible to log in, and it is much more difficult for scammers to get into your account.`}},template:`
                <mc-field-text v-model="v" type="textarea-autosize" title="McFieldText" placeholder="Placeholder" name="TextareaAutosize" />
            `}}},a={render(){return{components:{McFieldText:e},data(){return{v:null,maxLength:20}},template:`
                <mc-field-text 
                  v-model="v" 
                  type="textarea" 
                  title="McFieldText"
                  :max-length="maxLength"
                  :placeholder="'Try to entry more than ' + maxLength + ' chars'" 
                  name="TextareaMaxLength"
                />
                <br />
                Output: {{ v }}
            `}}},r={render(){return{components:{McFieldText:e},data(){return{v:null}},template:`
                <mc-field-text 
                  v-model="v" 
                  type="password" 
                  title="McFieldText"
                  placeholder="password pls" 
                  name="InputPassword"
                />
                <br />
                Output: {{ v }}
            `}}},s={render(){return{components:{McFieldText:e},data(){return{v:null}},template:`
                <mc-field-text 
                  v-model="v" 
                  type="date" 
                  title="McFieldText"
                  placeholder="Date pls" 
                  name="InputDate"
                />
                <br />
                Output: {{ v }}
            `}}},i={render(){return{components:{McFieldText:e},data(){return{v:null}},template:`
                <mc-field-text 
                  v-model="v" 
                  mask="+{1} 000-000-00-00"
                  title="McFieldText"
                  placeholder="Mask pls" 
                  name="InputMask"
                />
                <br />
                Output: {{ v }}
            `}}},c={render(){return{components:{McFieldText:e},data(){return{v:1e6}},template:`
                <mc-field-text 
                  v-model="v" 
                  type="amount_format"
                  title="McFieldText"
                  placeholder="AmountFormat pls" 
                  name="InputAmountFormat"
                />
                <br />
                Output: {{ v }}
            `}}},l={render(){return{components:{McFieldText:e},data(){return{v:1e6}},template:`
                <mc-field-text 
                  v-model="v" 
                  type="text"
                  copy
                  title="McFieldText"
                  placeholder="Copy pls" 
                  name="InputCopy"
                  @copy="(payload) => console.log('text for copy: ' + payload)"
                />
                <br />
                Output: {{ v }}
            `}}};var u,p,h;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    name: 'Default'
  }
}`,...(h=(p=t.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var y,f,g;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: 'User verification (KYC)\\n' + 'The KYC (Know Your Customer) procedure is a process of confirming (verifying) an identity using scans or photos of official documents.\\n' + 'According to generally accepted international standards, only verified users can conduct any transactions with money. Most often, to pass KYC, you need to upload documents confirming your identity and address of residence. This ensures companies that they’re not dealing with scammers, and users do not doubt the safety of their funds.\\n' + 'The KYC procedure is used by banks, exchanges, payment systems, and financial platforms.\\n' + 'Why is there KYC in MC Pay\\n' + 'MC Pay allows you to fully manage your income, keep money on your balance, withdraw it using convenient payment methods, and transfer it to other users. Therefore, in accordance with international practice, we must make the KYC procedure mandatory for our users.\\n' + 'Verification guarantees the security of all financial transactions. Thanks to KYC, we know for sure that we are paying money to the rightful owner of the account, and you can feel secure about the safety of your earnings. Only verified users can withdraw and transfer money.'
        };
      },
      template: \`
                <mc-field-text v-model="v" type="textarea" title="McFieldText" placeholder="Placeholder" name="Textarea" />
            \`
    };
  }
}`,...(g=(f=n.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var x,v,T;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: 'Two-factor authentication (2FA)\\n' + 'MC Pay is an advanced financial management solution. Your account stores your money, personal data, and transaction information. To ensure security, we have developed strong profile protection. All users must verify their email, pass KYC verification, and enable two-factor authentication (2FA).\\n' + 'What is 2FA\\n' + 'Two-factor authentication is one of the most reliable and modern ways to protect your profile. When logging in after entering a password, the user goes through another verification step. That is, they additionally confirm that they are the owner of the account.\\n' + 'Most often, in addition to the password, you need to specify a secret one-time code. It is obtained through:\\n' + '- SMS messages,\\n' + '- email,\\n' + '- code generation apps,\\n' + '- hardware generators,\\n' + '- pre-created code lists.\\n' + 'The main task of 2FA is to protect data from cybercriminals. To log into an account, scammers need to get access not only to the password, but also to the phone, email, or list of codes. And this is almost impossible. Therefore, payment systems, large banks, and serious services are increasingly implementing 2FA.\\n' + '2FA in MC Pay\\n' + 'Once 2FA is enabled, you need to confirm your account login in two ways. The first is entering a password or authorization through a social network. The second is entering the secret code from the SMS that we send to your phone number. Without access to the phone, it is impossible to log in, and it is much more difficult for scammers to get into your account.'
        };
      },
      template: \`
                <mc-field-text v-model="v" type="textarea-autosize" title="McFieldText" placeholder="Placeholder" name="TextareaAutosize" />
            \`
    };
  }
}`,...(T=(v=o.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var w,M,b;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: null,
          maxLength: 20
        };
      },
      template: \`
                <mc-field-text 
                  v-model="v" 
                  type="textarea" 
                  title="McFieldText"
                  :max-length="maxLength"
                  :placeholder="'Try to entry more than ' + maxLength + ' chars'" 
                  name="TextareaMaxLength"
                />
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(b=(M=a.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var F,A,C;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: null
        };
      },
      template: \`
                <mc-field-text 
                  v-model="v" 
                  type="password" 
                  title="McFieldText"
                  placeholder="password pls" 
                  name="InputPassword"
                />
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(C=(A=r.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var k,O,Y;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: null
        };
      },
      template: \`
                <mc-field-text 
                  v-model="v" 
                  type="date" 
                  title="McFieldText"
                  placeholder="Date pls" 
                  name="InputDate"
                />
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(Y=(O=s.parameters)==null?void 0:O.docs)==null?void 0:Y.source}}};var S,K,D;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: null
        };
      },
      template: \`
                <mc-field-text 
                  v-model="v" 
                  mask="+{1} 000-000-00-00"
                  title="McFieldText"
                  placeholder="Mask pls" 
                  name="InputMask"
                />
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(D=(K=i.parameters)==null?void 0:K.docs)==null?void 0:D.source}}};var P,I,L;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: 1000000
        };
      },
      template: \`
                <mc-field-text 
                  v-model="v" 
                  type="amount_format"
                  title="McFieldText"
                  placeholder="AmountFormat pls" 
                  name="InputAmountFormat"
                />
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(L=(I=c.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var z,W,_;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldText
      },
      data() {
        return {
          v: 1000000
        };
      },
      template: \`
                <mc-field-text 
                  v-model="v" 
                  type="text"
                  copy
                  title="McFieldText"
                  placeholder="Copy pls" 
                  name="InputCopy"
                  @copy="(payload) => console.log('text for copy: ' + payload)"
                />
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(_=(W=l.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};const se=["Default","Textarea","TextareaAutosize","MaxLength","Password","Date","Mask","AmountFormat","Copy"];export{c as AmountFormat,l as Copy,s as Date,t as Default,i as Mask,a as MaxLength,r as Password,n as Textarea,o as TextareaAutosize,se as __namedExportsOrder,re as default};
