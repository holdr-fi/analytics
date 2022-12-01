export const handlerWrapper = async function handlerWrapper(f: (...arg: any) => Promise<any>, name: string) {
  try {
    console.time(name);
    const data = await f();
    console.timeEnd(name);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: `${name}Handler error`,
    };
  }
};
