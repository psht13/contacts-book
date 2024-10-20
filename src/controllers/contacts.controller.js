import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.service.js';
import { parsePaginationParams } from '../utils/parse-pagination-params.js';
import { parseSortParams } from '../utils/parse-sort-params.js';
import { parseFilterParams } from '../utils/parse-filter-params.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });

  const {
    students,
    count: totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = data;

  res.status(200).json({
    status: 200,
    message:
      students.length !== 0
        ? 'Successfully found contacts!'
        : 'No contacts found',
    data: {
      data: students,
      sortOrder,
      sortBy,
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }

  if (contact) {
    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  }
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }

  res.status(204).send();
};
