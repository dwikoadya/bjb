const defaultMessage = 'Tidak boleh kosong';
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validation = {
  name: {
    required: defaultMessage
  },
  email: {
    pattern: re,
    required: defaultMessage
  },
  nip: {
    required: defaultMessage
  },
  photo: {
    required: defaultMessage
  },
  phone: {
    required: defaultMessage,
    minLength: 10,
    maxLength: 14
  },
  role_ids: {
    required: defaultMessage
  },
  job_position_id: {
    required: defaultMessage
  },
  branch_office_id: {
    required: defaultMessage
  }
}

export default validation;