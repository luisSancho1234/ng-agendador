import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';
import {
  AgendamentoDto,
  AgendamentoStatusEnum,
} from './models/dto/agendamento-dto';
import { AgendamentoForm } from './models/form/agendamento-form';
import { AuthForm } from './models/form/auth-form';
import { UsuarioForm } from './models/form/usuario-form';
import { JwtDecoded } from './models/jwt-decoded';
import { IPage } from './models/pagination/page';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly #http = inject(HttpClient);
  readonly #rootUrl = 'http://localhost:8080/';
  readonly #agendamentoUrl = 'v1/agendamento';
  readonly #authUrl = 'auth';

  authAddNewUser(form: UsuarioForm): Observable<string> {
    const params = toParams(form);
    return this.#http
      .post<string>(this.#rootUrl.concat(this.#authUrl, '/addNewUser'), {
        params,
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
      );
  }
  authGenerateToken(form: AuthForm): Observable<string> {
    return this.#http
      .post(this.#rootUrl.concat(this.#authUrl, '/generateToken'), form, {
        responseType: 'text',
      })
      .pipe(
        map((response: string) => {
          console.log(response);
          localStorage.setItem('token', response);
          return response;
        }),
      );
  }
  getAgendamentos(
    status: AgendamentoStatusEnum | null,
    pageable: {
      page: number;
      size: number;
    } = { page: 0, size: 20 },
  ): Observable<IPage<AgendamentoDto>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString());

    if (status != null) {
      params = params.set('status', status.toString());
    }
    console.log(params);

    return this.#http
      .get<
        IPage<AgendamentoDto>
      >(this.#rootUrl.concat(this.#agendamentoUrl), { params })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }
  getAgendamentoById(ageNrId: number): Observable<AgendamentoDto> {
    return this.#http
      .get<AgendamentoDto>(
        this.#rootUrl.concat(this.#agendamentoUrl, '/', ageNrId.toString()),
      )
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  createAgendamento(form: AgendamentoForm): Observable<AgendamentoDto> {
    return this.#http
      .post<AgendamentoDto>(this.#rootUrl.concat(this.#agendamentoUrl), form)
      .pipe(
        map((response) => {
          console.log('Agendamento criado:', response);
          return response;
        }),
      );
  }

  updateAgendamento(
    ageNrId: number,
    form: AgendamentoForm,
  ): Observable<AgendamentoDto> {
    return this.#http
      .put<AgendamentoDto>(
        this.#rootUrl.concat(this.#agendamentoUrl, '/', ageNrId.toString()),
        form,
      )
      .pipe(
        map((response) => {
          console.log('Agendamento atualizado:', response);
          return response;
        }),
      );
  }
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken() {
    return localStorage.getItem('token');
  }

  getPayload() {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    return jwtDecode<JwtDecoded>(token);
  }

  getRoles(): string[] {
    const payload = this.getPayload();

    return payload?.roles ?? [];
  }

  isExpired() {
    const payload = this.getPayload();

    if (!payload?.exp) {
      return true;
    }

    return Date.now() >= payload.exp * 1000;
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export function toParams(...args: any[]): HttpParams {
  let params = new HttpParams();

  args.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          Object.keys(value).forEach((subKey) => {
            const subValue = value[subKey];
            if (subValue !== undefined && subValue !== null) {
              params = params.append(subKey, subValue);
            }
          });
        } else {
          params = params.append(key, value);
        }
      }
    });
  });

  return params;
}
