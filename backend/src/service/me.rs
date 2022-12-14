use crate::lib::Error;
use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, PgPool};
use validator::Validate;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Me {
    id: String,
    name: String,
}

pub async fn get_me(pool: &PgPool, user_id: String) -> Result<Me, Error> {
    query_as!(
        Me,
        "
        select id, name from users
        where id = $1
        ",
        user_id
    )
    .fetch_one(pool)
    .await
    .map_err(Into::into)
}

#[derive(Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
pub struct CreateMe {
    #[validate(length(min = 3))]
    name: String,
}

pub async fn create_me(pool: &PgPool, user_id: String, input: CreateMe) -> Result<(), Error> {
    query!(
        "
        insert into users (id, name, created_at, updated_at)
        values ($1, $2, current_timestamp, current_timestamp)
        ",
        user_id,
        input.name
    )
    .execute(pool)
    .await
    .map(|_| ())
    .map_err(Into::into)
}

pub async fn delete_me(pool: &PgPool, user_id: String) -> Result<(), Error> {
    query!(
        "
        delete from users
        where id = $1
        ",
        user_id
    )
    .execute(pool)
    .await
    .map(|_| ())
    .map_err(Into::into)
}
