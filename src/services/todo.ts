import {get} from "./api";

export  const getTodo = async () => {
  return await get('todo');
};
