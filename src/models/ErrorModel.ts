import ErrorDetail from "./ErrorDetail";

export default class ErrorModel {
  errors = [ErrorDetail];

  exception = null;

  path = null;

  code = null;

  timestamp = 0;

  traceId = null;

  XMLResponse = null;

  actionType = "";

  scope = null;
}
