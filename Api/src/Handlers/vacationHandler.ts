import messages from "../Helpers/serverMessages";
import {
  getVacationsQuery,
  deleteVacationQuery,
  editVacationQuery,
  addVacationQuery,
  getFollowersQuery,
  getCategoriesQuery,
  sortByCategoryQuery,
  addFollowerQuery,
  removeFollowerQuery,
  sortByDatesQuery,
  removeAllFollowersQuery,
} from "../Queries/vacationQuery";


export async function getVacationsHandler(req, res, next) {
  const result = await getVacationsQuery();
  return res.status(200).json(result);
}

export async function getFollowersHandler(req, res, next) {
  const result = await getFollowersQuery();
  return res.status(200).json(result);
}

export async function getCategoriesHandler(req, res, next) {
  const result = await getCategoriesQuery();
  return res.status(200).json(result);
}

export async function sortByDatesHandler(req, res, next) {
  const payload = req.body;
  const result = await sortByDatesQuery(payload);
  if(result.length< 1){
    return res.status(400).json({ message: messages.vacationNotFound });
  }
  return res.status(200).json(result);
}
export async function sortByCategoryHandler(req, res, next) {
  const { category } = req.params;
  const result = await sortByCategoryQuery(category);
  return res.status(200).json(result);
}

export async function editVacationHandler(req, res, next) {
  const payload = req.body;
  await editVacationQuery(payload);
  return res.status(200).json({ message: messages.success });
}

export async function addVacationHandler(req, res, next) {
  const payload = req.body;
  await addVacationQuery(payload);
  return res.status(200).json({ message: messages.success });
}

export async function deleteVacationHandler(req, res, next) {
  const { id } = req.params;
  await deleteVacationQuery(id);
  return res.status(200).json({ message: messages.success });
}
export async function followersHandler(req, res, next) {
  // add/remove follower depanding the 'operator'
  const {id, operator} = req.body
  if(operator ==="+"){
    await addFollowerQuery(id)
  }
  else if (operator==="all"){
    await removeAllFollowersQuery()
  }
  else await removeFollowerQuery(id)
  return res.status(200).json({ message: messages.success });
}

