import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 1000,
  duration: "20s",
  rps: 1000
};

export default function () {
  http.get("http://localhost:3000/1005000");
  sleep(1);
};
