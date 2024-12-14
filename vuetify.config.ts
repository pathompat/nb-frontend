import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
    config: true,
    labComponents: ['VDateInput'],
    theme: {
        defaultTheme: 'light',
    },
    defaults: {
        VTextField: {
            variant: 'outlined',
            density: 'compact',
            hideDetails: true,
            color: 'primary',
        },
        VBtn: {
            variant: 'outlined',
            color: 'primary',
        },
        VSelect: {
            variant: 'outlined',
            density: 'compact',
            hideDetails: true,
            color: 'primary',
        },
        VDateInput: {
            density: 'compact',
            hideDetails: true,
            clearable: true,
            variant: 'outlined',
            color: 'primary',

            prependIcon: '',
            appendInnerIcon: '$calendar',
        },
        VTextarea: {
            color: 'primary',

            variant: 'outlined',
            density: 'compact',
            hideDetails: true,
        },
        VCheckbox: {
            color: 'primary',
            density: 'compact',
            hideDetails: true,
        },
        VAutocomplete: {
            color: 'primary',
            density: 'compact',
            variant: 'outlined',
            hideDetails: true,
        },
        VSwitch: {
            color: 'primary',
            density: 'compact',
            variant: 'outlined',
            hideDetails: true,
        },

        VRadioGroup: {
            color: 'primary',
            hideDetails: true,
        },
    },
    /* other vuetify options */
})
