// import { store } from "../redux/store";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import logger from "./logger";
import onError from "./onError";
import ErrorModel from "@/models/error/errorModel";
// import SessionSelectors from "@/redux/session/selectors";
// import { store } from "@/redux/store";
// import SessionSelectors from "../redux/session/sessionSelector";

interface ErrorContext {
  url: string;
  status: string;
  message: string;
}

interface RestRequest {
  url: string;
  method: string;
}

interface Config extends AxiosRequestConfig {
  headers?: Record<string, string>;
}

const getErrorContext = (errObj: any): ErrorContext => ({
  url: errObj?.config?.url || "",
  status: errObj?.status || "",
  message: errObj.message,
});

function getConsoleMessageForError(error: AxiosError): string {
  if (error?.response) {
    const { data } = error.response;
    return JSON.stringify({
      ...getErrorContext(error.response),
      data: data || {},
    });
  }
  if (error?.request) {
    return JSON.stringify(getErrorContext(error));
  }

  return "";
}

const RequestMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
  Options: "OPTIONS",
  Head: "HEAD",
  Patch: "PATCH",
};

export function getAuthToken() {
  // const { idToken } = SessionSelectors.SelectToken(store.getState());
  // return idToken;
  return "eyJraWQiOiJGWGI3MlNwV21HdjJjWHo3QmZkRHlIdTAyWk9mNGVYWEZacEFZcE1kZElFPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206Y3JlYXRlZF9hdCI6IjE3MTQxMjIwNTE4MTgiLCJzdWIiOiI2MTUzMGRjYS03MDMxLTcwZGEtYjFkNS1kYjVkMWVjZjI5YzIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xXzZleERyb0I1NCIsInVwZGF0ZWRfYXQiOjE3MTQxMjIwNTE4MTgsImF1dGhfdGltZSI6MTcxOTgxNzgwNywiZXhwIjoxNzIwMDA2NzYyLCJjdXN0b206cm9sZSI6Ik9XTkVSIiwiaWF0IjoxNzIwMDAzMTYyLCJqdGkiOiJhYzY5YWZkNC0zYWI4LTQ0ODQtYjViNC04ZWQxMGFiY2VlOGUiLCJlbWFpbCI6ImthbWFsX2tpc2hvcmVAYXZvY2Fkb2xhYnMuaW4iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImFkZHJlc3MiOnsiZm9ybWF0dGVkIjoicHVuZSJ9LCJjdXN0b206b3JnYW5pc2F0aW9uTmFtZSI6IkF2b2NhZG8gTGFicyIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOmlzVmVyaWZpZWRCeUFkbWluIjoiMCIsImNvZ25pdG86dXNlcm5hbWUiOiI2MTUzMGRjYS03MDMxLTcwZGEtYjFkNS1kYjVkMWVjZjI5YzIiLCJnaXZlbl9uYW1lIjoia2FtYWwiLCJjdXN0b206b3JnYW5pc2F0aW9uSWQiOiJvcjUwY2MwYmRhIiwib3JpZ2luX2p0aSI6ImZlNDIzZjM0LTRlMjItNDhiMS1iOWJhLTc5ZjAwNTQ0ZWY0NyIsImF1ZCI6IjdkOWEwNzRubGt0OG5tbG91dW9udmk5MmQzIiwiZXZlbnRfaWQiOiIwZmI2YzA5MS1lYmM4LTRmZTQtOTkzZC1iYjliMzU3NzQwY2MiLCJ0b2tlbl91c2UiOiJpZCIsInBob25lX251bWJlciI6Iis5MTcwNzA5NzAwNTAiLCJmYW1pbHlfbmFtZSI6Imtpc2hvciJ9.j6a7RhKc3D8_DKcexIHUYEkqd-Zt84jMrtFJt-ZtuPqsAo_IRUm2mIGXNiWlnIn0cPBAqgVj6S32ovn_JwSs1Y8sGwR7kNXPZ7YBSEgnlrkl22HMjqCd0B5THu4VSXIA94eV_e77-R-Ew6uS8hLGXpXvKfBfWaEJGoZwkXN2_W_HN4yIJjyz0bFYheUR0Av3yTClT5wqB6E-ZIIwVdPHsuRdh0BXmtZ4mchbp9LLF5U9q6NqncDuBR8AryH4lPfHoh1HCBksuIirtb-nXnnyXyzFvG33UoIGAWWikjA747NV4RWJCOVbcX2d8Z5SCmmKpKUSCcAN8VQFk9dxa5b_hA"
}

function dofillInErrorWithDefaults(
  error: any,
  request: RestRequest
): ErrorModel {
  const model = new ErrorModel();
  model.code = error.code || 0;
  model.exception = error.exception || "Error requesting data";
  model.errors = error.errors && error.errors.length ? error.errors : null;
  model.path = error.path || request.url;
  model.timestamp = error.timestamp || new Date().getTime();
  return model;
}

/**
 * We want to show the loading indicator to the user but sometimes the api
 * request finished too quickly. This makes sure there the loading indicator is
 * visual for at least a given time.
 *
 * @param duration
 * @returns {Promise<void>}
 * @private
 */
function doDelay(duration: number = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
async function doRequest(
  restRequest: RestRequest,
  config: Config,
  isAuthenticated = true
): Promise<any> {
  if (!restRequest.url) {
    logger.error(
      `Received ${restRequest.url} which is invalid for a endpoint url`
    );
  }

  try {
    const axiosRequestConfig = {
      ...config,
      method: restRequest.method,
      url: restRequest.url,
      headers: {
        // auth
        ...(isAuthenticated && { Authorization: `Bearer ${getAuthToken()}` }),
        "Content-Type": "application/json",
        ACTIVE_ORGANISATION_ID: "or50cc0bda",
        ...config?.headers,
      },
    };
    logger.trace(
      `calling request:  ${axiosRequestConfig.method}@${axiosRequestConfig.url}`
    );
    const [axiosResponse] = await Promise.all([
      axios(axiosRequestConfig),
      doDelay(),
    ]);
    const { status, data, request } = axiosResponse;
    logger.trace(`request response ${JSON.stringify(axiosResponse?.request)} `);
    if (data?.success === false) {
      return dofillInErrorWithDefaults(
        {
          code: status,
          exception: data.errors.join(" - "),
          errors: data.errors,
          path: request ? request.responseURL : restRequest.url,
        },
        restRequest
      );
    }

    return {
      ...axiosResponse,
    };
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return "cancelled";
    }
    onError(error);
    if (error.response) {
      logger.error(`error in response ${getConsoleMessageForError(error)} `);
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      const { status, data } = error.response;
      const { errors } = data?.errors ? data : { errors: [] };
      return dofillInErrorWithDefaults(
        {
          code: data.code || status,
          exception: data.exception || errors.filter(Boolean).join(" - "),
          errors,
          path: data.path || error.request.responseURL,
          timestamp: data.timestamp,
          traceId: data.traceId,
          xmlResponse:
            typeof data === "string" && data.startsWith("<?xml") ? data : null,
        },
        restRequest
      );
    }
    if (error.request) {
      // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      const { status, message } = error;
      logger.error(`error in request ${getConsoleMessageForError(error)} `);
      return dofillInErrorWithDefaults(
        {
          code: status,
          exception: message,
          timestamp: new Date().getTime(),
        },
        restRequest
      );
    }

    // Something happened in setting up the request that triggered an Error
    return dofillInErrorWithDefaults(
      {
        code: 0,
        exception: error.message,
        errors: [error.message],
        path: restRequest.url,
      },
      restRequest
    );
  }
}

export async function get(
  endpoint: string,
  params?: Record<string, string>,
  requestConfig?: Config,
  isAuthenticated?: boolean
): Promise<any> {
  const paramsConfig = params ? { params } : undefined;
  return doRequest(
    {
      url: endpoint,
      method: RequestMethod.Get,
    },
    {
      ...paramsConfig,
      ...requestConfig,
    },
    isAuthenticated
  );
}

export function post(
  endpoint: string,
  data?: any,
  requestConfig: Config = {},
  isAuthenticated?: boolean
): Promise<any> {
  const config: any = data || null ? { data, ...requestConfig } : undefined;
  return doRequest(
    {
      url: endpoint,
      method: RequestMethod.Post,
    },
    config,
    isAuthenticated
  );
}

export function patch(
  endpoint: string,
  data?: any,
  requestConfig: Config = {},
  isAuthenticated?: boolean
): Promise<any> {
  const config: any = data || null ? { data, ...requestConfig } : undefined;
  return doRequest(
    {
      url: endpoint,
      method: RequestMethod.Patch,
    },
    config,
    isAuthenticated
  );
}
export function put(
  endpoint: string,
  data?: any,
  requestConfig: Config = {},
  isAuthenticated?: boolean
): Promise<any> {
  const config: any = data || null ? { data, ...requestConfig } : undefined;

  return doRequest(
    {
      url: endpoint,
      method: RequestMethod.Put,
    },
    config,
    isAuthenticated
  );
}
export function del(
  endpoint: string,
  isAuthenticated?: boolean,
  data?: any
): Promise<any> {
  const config: any = data || null ? { data } : undefined;
  return doRequest(
    {
      url: endpoint,
      method: RequestMethod.Delete,
    },
    config,
    isAuthenticated
  );
}
