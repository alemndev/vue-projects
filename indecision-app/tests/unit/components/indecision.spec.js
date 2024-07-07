import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Indecision component', () => {
  let wrapper
  let clgSpy

  // fetch mock
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    })
  )

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    // Spy - Object - Method
    clgSpy = jest.spyOn(console, 'log')

    jest.clearAllMocks()
  })

  test('Escribir en el input no debe disparar nada', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

    //expect(wrapper.html()).toMatchSnapshot()
    const input = wrapper.find('input')
    await input.setValue('Hello world')

    expect(clgSpy).toHaveBeenCalledTimes(1)
    // expect(getAnswerSpy).toHaveReturnedTimes(0)
    //console.log(wrapper.vm)
  })

  test('Escribir el signo de interrogación debe disparar el fetch', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

    const input = wrapper.find('input')
    await input.setValue('Hola?')

    expect(getAnswerSpy).toHaveBeenCalled()
  })

  test('Pruebas en getAnswer', async () => {
    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect(img.exists()).toBeTruthy()
    expect(wrapper.vm.answer).toBe('yes')
  })

  test('Pruebas en getAnswer - Fallo en API', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('nope'))

    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect(img.exists()).toBeFalsy()
    expect(wrapper.vm.answer).toBe('load API failed.')
  })
})
