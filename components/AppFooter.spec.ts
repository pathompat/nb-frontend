import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AppFooter from './AppFooter.vue'

describe('AppFooter', () => {
  it('component renders year in footer', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain('2016-')
  })
})