/**
 * To learn more about Link Resolving check out the Prismic documentation
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'about_page') {
    return '/'
  }

  if (doc.type === 'project_page') {
    return '/project/' + doc.uid
  }

  return '/not-found'
}