// import { test, describe, expect } from 'vitest'
import { Slug } from './slug'

describe('Slug teste', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('An example text title')
    expect(slug.value).toEqual('an-example-text-title')
  })
})
