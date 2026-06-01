import axios from './axios';

export const api = {
  // CONTACT
  contact: {
    submit: async (data) => {
      return await axios.post('/contact', data);
    }
  },

  // SUBSCRIBERS
  subscribers: {
    subscribe: async (email) => {
      return await axios.post('/subscribers', {
        email
      });
    }
  },

  // GET STARTED
  getStarted: {
    submit: async (data) => {
      return await axios.post(
        '/get-started',
        data
      );
    }
  },

  // JOBS
  jobs: {
    getAll: async (params = {}) => {
      return await axios.get('/jobs', {
        params
      });
    },

    getById: async (id) => {
      return await axios.get(`/jobs/${id}`);
    },

    getFeatured: async () => {
      return await axios.get('/jobs/featured');
    },

    create: async (data) => {
      return await axios.post('/jobs', data);
    },

    update: async (id, data) => {
      return await axios.put(
        `/jobs/${id}`,
        data
      );
    },

    delete: async (id) => {
      return await axios.delete(
        `/jobs/${id}`
      );
    },

    apply: async (jobId, data) => {
      return await axios.post(
        `/jobs/${jobId}/apply`,
        data
      );
    }
  },

  // COMPANIES
  companies: {
    getAll: async (params = {}) => {
      return await axios.get('/companies', {
        params
      });
    },

    getById: async (id) => {
      return await axios.get(
        `/companies/${id}`
      );
    },

    getFeatured: async () => {
      return await axios.get(
        '/companies/featured'
      );
    },

    getIndustries: async () => {
      return await axios.get(
        '/companies/industries'
      );
    }
  }
};