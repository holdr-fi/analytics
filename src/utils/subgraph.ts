import axios from 'axios';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export class SubgraphClient {
  url: string;
  constructor(_url: string) {
    this.url = _url;
  }

  public async get(query) {
    try {
      const payload = this.toPayload(query);
      const {
        data: { data },
      } = await axios.post(this.url, payload);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  toPayload(query) {
    return JSON.stringify({ query: jsonToGraphQLQuery({ query }) });
  }
}
