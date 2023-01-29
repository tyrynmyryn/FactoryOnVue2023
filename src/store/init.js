import { Setting, Part } from './base';


export const initSettings = () => ([
    new Setting('types', 'Тип биоробота', ['FrontEnd', 'Design']),
    new Setting('genders', 'Стабилизатор', ['Male', 'Female']),
])

export const initParts = () => ([
    new Part('biomech', 'Биомеханизм', ['Биомеханизма', 'Биомеханизма', 'Биомеханизов'], 7, 5, 0, 4),
    new Part('processor', 'Процессор', ['Процессора', 'Процессора', 'Процессоров'], 5, 3, 0, 4),
    new Part('soul', 'Душа', ['Души', 'Душ', 'Душ'], 25, 15, 0, 1),
])

export const initSelected = () => {
    return initSettings().reduce((acc, val) => {
        return {...acc, [val.value]: ''}
    }, {})
}