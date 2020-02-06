function createResource(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      if (status === 'success') return result;
    }
  };
}

export default createResource;
