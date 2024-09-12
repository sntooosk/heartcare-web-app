import { HttpHeaders } from "@angular/common/http";

export function httpGetAuth(token : String): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  