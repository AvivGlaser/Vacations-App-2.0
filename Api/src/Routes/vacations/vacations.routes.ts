import { Router } from 'express';
import { getVacationsHandler,editVacationHandler, addVacationHandler,getCategoriesHandler,getFollowersHandler, followersHandler,deleteVacationHandler, sortByCategoryHandler, sortByDatesHandler} from "../../Handlers/vacationHandler";

const vacationsRouter = Router();

vacationsRouter.get("/", getVacationsHandler);
vacationsRouter.put("/edit", editVacationHandler);
vacationsRouter.post("/add", addVacationHandler);
vacationsRouter.get("/categories", getCategoriesHandler);
vacationsRouter.post("/dates", sortByDatesHandler);
vacationsRouter.post("/sort-by/:category", sortByCategoryHandler);
vacationsRouter.get("/data", getFollowersHandler);
vacationsRouter.post("/follow", followersHandler);
vacationsRouter.delete("/delete/:id", deleteVacationHandler);

export default vacationsRouter;