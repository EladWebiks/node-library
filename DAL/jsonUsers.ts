import jsonfile from 'jsonfile';
import { User } from '../models/types';


export const writeUserToJsonFile = async (user: User)=>{

    jsonfile.readFile('./data/db.json')
    .then(users => {
        users.push(user);
        jsonfile.writeFile('./data/db.json', users, function (err) {
    if (err) console.error(err)
  })

    })
    .catch(error => console.error(error))
}

export const readFromJsonFile = async()=>{

    
    const users = await jsonfile.readFile('./data/db.json');
    return users;
}

