import { HttpHeaders } from '@angular/common/http';

const HEADER_DICT = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const REQUEST_OPTIONS = {
  headers: new HttpHeaders(HEADER_DICT)
};

export { REQUEST_OPTIONS };
