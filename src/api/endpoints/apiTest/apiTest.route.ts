import { RouteConfiguration, Server } from "hapi";

import APITestController from "./apiTest.controller";

export function register(server?: Server): RouteConfiguration[] {
  const controller = new APITestController();

  return [
    {
      handler: controller.getTest,
      method: "GET",
      path: "/test"
    },
    {
      handler: controller.getTestAsync,
      method: "GET",
      path: "/testAsync"
    }
  ];
}
