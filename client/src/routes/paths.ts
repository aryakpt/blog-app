import {intParser, route} from 'typesafe-routes';

const paths = {
  home: route('/', {}, {}),
  login: route('/login', {}, {}),
  register: route('/register', {}, {}),
  single: route('/post/:id', {id: intParser}, {}),
  write: route('/login', {}, {}),
};

export default paths;
