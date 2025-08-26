import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldText from '@/components/elements/McFieldText/McFieldText.vue'
import { InputTypes, Autocomplete } from '@/enums/Input'
import { Directions } from '@/enums/ui/Directions'

const meta = {
    title: 'McFieldText',
    component: McFieldText,
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: Object.values(InputTypes) },
        disabled: { control: 'boolean' },
        copy: { control: 'boolean' },
        readOnly: { control: 'boolean' },
        isMobile: { control: 'boolean' },
        required: { control: 'boolean' },
        clearOutput: { control: 'boolean' },
        //@ts-ignore
        modelValue: { control: 'none' },
        dir: { control: 'select', options: Object.values(Directions) },
        title: { control: 'text' },
        helpText: { control: 'text' },
        mask: { control: 'text' },
        placeholder: { control: 'text' },
        name: { control: 'text' },
        autocomplete: { control: 'select', options: Object.values(Autocomplete) },
        tabindex: { control: 'number' },
        maxDecimals: { control: 'number' },
        locale: { control: 'text' },
        maxLength: { control: 'number' },
    },
    args: {
        disabled: false,
        copy: false,
        readOnly: false,
        isMobile: false,
        required: false,
        clearOutput: false,
        type: InputTypes.Text,
        dir: Directions.Ltr,
        title: 'McFieldText',
        helpText: 'Help text',
        errors: ['Error text'],
        placeholder: 'McFieldText placeholder',
        name: 'McFieldText name',
        autocomplete: Autocomplete.Off,
        tabindex: 0,
        maxDecimals: 2,
        maxLength: 255,
        locale: 'en',
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
        },
    },
} satisfies Meta<typeof McFieldText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'Default'
    },
};

export const Textarea: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: 'User verification (KYC)\n' +
                      'The KYC (Know Your Customer) procedure is a process of confirming (verifying) an identity using scans or photos of official documents.\n' +
                      'According to generally accepted international standards, only verified users can conduct any transactions with money. Most often, to pass KYC, you need to upload documents confirming your identity and address of residence. This ensures companies that they’re not dealing with scammers, and users do not doubt the safety of their funds.\n' +
                      'The KYC procedure is used by banks, exchanges, payment systems, and financial platforms.\n' +
                      'Why is there KYC in MC Pay\n' +
                      'MC Pay allows you to fully manage your income, keep money on your balance, withdraw it using convenient payment methods, and transfer it to other users. Therefore, in accordance with international practice, we must make the KYC procedure mandatory for our users.\n' +
                      'Verification guarantees the security of all financial transactions. Thanks to KYC, we know for sure that we are paying money to the rightful owner of the account, and you can feel secure about the safety of your earnings. Only verified users can withdraw and transfer money.',
                }
            },
            template: `
                <mc-field-text v-model="v" type="textarea" title="McFieldText" placeholder="Placeholder" name="Textarea" />
            `
        }
    },
};
export const TextareaAutosize: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v:
                      'Two-factor authentication (2FA)\n' +
                      'MC Pay is an advanced financial management solution. Your account stores your money, personal data, and transaction information. To ensure security, we have developed strong profile protection. All users must verify their email, pass KYC verification, and enable two-factor authentication (2FA).\n' +
                      'What is 2FA\n' +
                      'Two-factor authentication is one of the most reliable and modern ways to protect your profile. When logging in after entering a password, the user goes through another verification step. That is, they additionally confirm that they are the owner of the account.\n' +
                      'Most often, in addition to the password, you need to specify a secret one-time code. It is obtained through:\n' +
                      '- SMS messages,\n' +
                      '- email,\n' +
                      '- code generation apps,\n' +
                      '- hardware generators,\n' +
                      '- pre-created code lists.\n' +
                      'The main task of 2FA is to protect data from cybercriminals. To log into an account, scammers need to get access not only to the password, but also to the phone, email, or list of codes. And this is almost impossible. Therefore, payment systems, large banks, and serious services are increasingly implementing 2FA.\n' +
                      '2FA in MC Pay\n' +
                      'Once 2FA is enabled, you need to confirm your account login in two ways. The first is entering a password or authorization through a social network. The second is entering the secret code from the SMS that we send to your phone number. Without access to the phone, it is impossible to log in, and it is much more difficult for scammers to get into your account.',
                }
            },
            template: `
                <mc-field-text v-model="v" type="textarea-autosize" title="McFieldText" placeholder="Placeholder" name="TextareaAutosize" />
            `
        }
    },
};
export const MaxLength: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: null,
                    maxLength: 20
                }
            },
            template: `
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
            `
        }
    },
};
export const Password: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: null,
                }
            },
            template: `
                <mc-field-text 
                  v-model="v" 
                  type="password" 
                  title="McFieldText"
                  placeholder="password pls" 
                  name="InputPassword"
                />
                <br />
                Output: {{ v }}
            `
        }
    },
};
export const Date: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: null,
                }
            },
            template: `
                <mc-field-text 
                  v-model="v" 
                  type="date" 
                  title="McFieldText"
                  placeholder="Date pls" 
                  name="InputDate"
                />
                <br />
                Output: {{ v }}
            `
        }
    },
};
export const Mask: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: null,
                }
            },
            template: `
                <mc-field-text 
                  v-model="v" 
                  mask="+{1} 000-000-00-00"
                  title="McFieldText"
                  placeholder="Mask pls" 
                  name="InputMask"
                />
                <br />
                Output: {{ v }}
            `
        }
    },
};
export const AmountFormat: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: 1000000,
                }
            },
            template: `
                <mc-field-text 
                  v-model="v" 
                  type="amount_format"
                  title="McFieldText"
                  placeholder="AmountFormat pls" 
                  name="InputAmountFormat"
                />
                <br />
                Output: {{ v }}
            `
        }
    },
};
export const Copy: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: 1000000,
                }
            },
            template: `
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
            `
        }
    },
};
export const Disabled: Story = {
    render() {
        return {
            components: { McFieldText },
            data() {
                return {
                    v: 1000000,
                }
            },
            template: `
                <mc-field-text 
                  v-model="v" 
                  type="text"
                  disabled
                  title="McFieldText"
                  placeholder="Copy pls" 
                  name="InputCopy"
                  @copy="(payload) => console.log('text for copy: ' + payload)"
                />
            `
        }
    },
};