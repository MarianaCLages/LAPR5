import ITripGetter from "../../services/IRepos/ITripGetter";
import config from "../../../config";
import TruckOrderPlan from "../../repos/TruckOrderPlan";
import GetBestPathService from "../../services/getBestPathService";
import { Container } from "typedi";

export default class PlanAlgAdapter {
  public static getPlaning(): ITripGetter {
    if (config.planingAlgorithm === "AL1") {
      return new TruckOrderPlan()
    } else if (config.planingAlgorithm === "AL2") {
      return Container.get("GetBestPathService")
    }else {
      throw new Error("invalid planing algorithm ${config.planingAlgorithm}");
    }
  }
}