export function getGroupFiles(arr) {
  const result = [];
  const object = {};

  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i].group_uid)) {
      result.push(arr[i].group_uid);
    }
  }

  for (let i = 0; i < result.length; i++) {
    object[result[i]] = {
      group_uid: '',
      type: '',
      files: [],
    };
  }

  for (let i = 0; i < arr.length; i++) {
    object[arr[i].group_uid].group_uid = arr[i].group_uid;
    object[arr[i].group_uid].tags_century = arr[i].tags_century;
    object[arr[i].group_uid].type = arr[i].type;
    object[arr[i].group_uid].title = arr[i].title;
    object[arr[i].group_uid].author = arr[i].author;
    object[arr[i].group_uid].location = arr[i].location;
    object[arr[i].group_uid].tags_information = arr[i].tags_information;
    object[arr[i].group_uid].comment = arr[i].comment;
    object[arr[i].group_uid].year = arr[i].year;
    object[arr[i].group_uid].files.push(arr[i]);
  }
  return Object.values(object);
}
