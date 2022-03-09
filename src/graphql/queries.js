import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query {
    books {
      id, 
        image_url, 
        title, 
        subtitle, 
        publisher, 
        release_date,
        published_at, 
        full_description, 
        available_copies, 
        price, 
        rating, 
        likes, 
        number_of_purchases, 
        full_description, 
        authors { name }, 
        tags { name }, 
        genres { name } 
    }
  }
`;

export const GET_BOOK = gql`
  query book($id: ID!)  {
    book(id: $id ) {
      id
      created_at
      updated_at
      subtitle
      publisher
      release_date
      number_of_purchases
      likes
      rating
      price
      currency
      available_copies
      full_description
      title
      featured
      image_url
      published_at
      authors {
        name
      }
      tags {
        name
      }
      genres {
        name
      }
    }
  }
`;