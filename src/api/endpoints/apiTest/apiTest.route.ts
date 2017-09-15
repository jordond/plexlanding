import { RouteConfiguration, Server } from "hapi";

import apiTestController from "./apiTest.controller";

export default function register(server?: Server): RouteConfiguration[] {
  const controller = new apiTestController();

  return [
    {
      config: {
        handler: controller.getTest
      },
      method: "get",
      path: "/test"
    },
    {
      handler: controller.getTestAsync,
      method: "get",
      path: "/testAsync"
    }
  ];
}
