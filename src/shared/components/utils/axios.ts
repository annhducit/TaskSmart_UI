import { tsmAxios } from '@/configs/axios';
import { JSON_TYPE, JSON_UTF8_TYPE } from '@/shared/constant';
import type { AxiosResponse } from 'axios';
import { get } from 'lodash';

export const axiosSuccessResponse = (response: AxiosResponse) => {
  switch (get(response, 'headers[content-type]')) {
    case JSON_UTF8_TYPE:
    case JSON_TYPE: {
      if (get(response, 'data.statusCode') !== 200) {
        throw new Error(get(response, 'data.message'));
      }

      return response;
    }

    default:
      return response;
  }
};

export const setTSMAxiosToken = (accessToken?: string) => {
  tsmAxios.defaults.headers.common['Authorization'] = !accessToken ? null : `Bearer ${accessToken}`;
};
