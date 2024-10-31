import { tasksCollection } from '../db/models/tasks.js';

// do not delete - for testing purposes
export const getTaskById = async (taskId, boardId) => {
  return await tasksCollection.findOne({ _id: taskId, boardId });
};
//end of testing block

// Получить задачи по ID доски
export const getTasksByBoardId = async (boardId) => {
  return await tasksCollection.find({ boardId });
};

// Создать новую задачу
export const createTask = async (taskData) => {
  return await tasksCollection.create(taskData);
};

// Удалить задачу по ID и ID доски
export const deleteTask = async (taskId, boardId) => {
  return await tasksCollection.findOneAndDelete({ _id: taskId, boardId });
};

// Обновить задачу по ID
export const updateTask = async (taskId, taskData) => {
  return await tasksCollection.findByIdAndUpdate(taskId, taskData, {
    new: true,
  });
};

// import { tasksCollection } from '../db/models/tasks.js';

// export const getTasksByBoardId = async ({ boardId }) => {
//   const tasksQuery = tasksCollection.find({ boardId });
//   {
//     tasksQuery.where('boardId').equals(filter.boardId);
//   }

//   if (filter.contactType) {
//     tasksQuery.where('contactType').equals(filter.contactType);
//   }

//   if (typeof filter.isFavourite !== 'undefined') {
//     tasksQuery.where('isFavourite').equals(filter.isFavourite);
//   }
//   const [contacts] = await Promise.all([
//     tasksCollection.find().merge(tasksQuery).countDocuments(),
//     tasksQuery.sort({ [sortBy]: sortOrder }).exec(),
//   ]);

//   return {
//     data: contacts,
//   };
// };

// export const getContactById = async (contactId, boardId) => {
//   const contact = await tasksCollection.findOne({ _id: contactId, boardId });
//   return contact;
// };

// export const createContact = async (payload) => {
//   const contact = await tasksCollection.create(payload);
//   return contact;
// };

// export const updateContact = async (
//   contactId,
//   boardId,
//   payload,
//   options = {},
// ) => {
//   const rawResult = await tasksCollection.findOneAndUpdate(
//     { _id: contactId, boardId },
//     payload,

//     { new: true, runValidators: true, ...options },
//   );

//   return rawResult;
// };

// export const deleteContact = async (contactId, boardId) => {
//   const contact = await tasksCollection.findOneAndDelete({
//     _id: contactId,
//     boardId,
//   });

//   return contact;
// };
