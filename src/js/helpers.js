import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//prettier-ignore
export const handleError = function (response, message = `Something went wrong. 🧨🧨`) {
    if (!response.ok) throw new Error(`${message} Status: ${response.status} - (${response.statusText})`, response);
  };

export const AJAX = async function (url, uploadData = undefined, errorMessage) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    //prettier-ignore
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    handleError(res, errorMessage);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

/*
export const getJSON = async function (url, errorMessage) {
  try {
    //prettier-ignore
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    handleError(res, errorMessage);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData, errorMessage) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    //prettier-ignore
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    handleError(res, errorMessage);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
*/
