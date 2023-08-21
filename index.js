import _ from 'lodash';

export default function solution(content){
  // BEGIN
  const object = convertToObject(content);
  console.log(object[0])
  console.log(count(object));
  console.log(namePort(object));
  console.log(manWoman(object));
  console.log(surviveds(object));
  console.log(nameA(object));
   // END

}
  const convertToObject = (content) => {
    const current = content.split('\n').slice(1).filter((el) => el !== '').map((el) => {
      const values = el.split(',')
      const curValues = [];
      for (let i = 0; i < values.length; i += 1) {
        if (values[i].startsWith('"')) {
          curValues.push(`${values[i]},${values[i + 1]}`);
          i += 1;
        } else {
          curValues.push(values[i]);
        }
      }
      return curValues;
    });
    const Object = current.map((el) => ({
      
      PassengerId: el[0],
      Survived: el[1],
      Pclass: el[2],
      Name: el[3].replace(/"/gi,''),
      Sex: el[4],
      Age: el[5],
      SibSp: el[6],
      Parch: el[7],
      Ticket: el[8],
      Fare: el[9],
      Cabin: el[10],
      Embarked: el[11],
    
    }));
    return Object;
  };
// - выведите число сколько всего пассажиров в этой таблице
const count = (object) => `Всего пассажиров: ${object.length}`;

// - выведите все именования портов посадки (колонка Embarked)
const namePort = (object) => {
  const nameOfPort = object.map (({Embarked}) => Embarked);
  return `Все именования портов посадки: ${_.uniq(nameOfPort.filter(el => el !== '')).sort().join(', ')}`
}
// - выведите соотношение пассажиров мужчин и женщин
const manWoman = (object) => {
  const Womans = object.filter(( {Sex} ) => Sex === 'female');
  const Mans = object.length - Womans.length / object.length;
  return `Cоотношение пассажиров мужчин и женщин: ${Mans}`
}
// - выведите процент выживших пассажиров
const surviveds = (object) => {
  const ofSurvived = object.filter(( {Survived} ) => Survived === '1');
return `Процент выживших пассажиров ${ofSurvived.length / object.length * 100}`
}
// - выведите имена всех пассажиров, начинающиеся на букву А
const nameA = (object)=> {
  return `Имена всех пассажиров, начинающиеся на букву А: ${object.reduce((acc, item) => {
    if(item.Name.startsWith('A'))
      acc.push(item.Name)
    return acc;
  }, []).join(', ')}`
}