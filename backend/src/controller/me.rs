use super::lib::AccessTokenDecoded;
use crate::lib::Error;
use crate::service::me::*;
use actix_web::{
    delete, get, post,
    web::{Data, Json, ServiceConfig},
};
use sqlx::PgPool;

pub fn init(cfg: &mut ServiceConfig) {
    cfg.service(index);
    cfg.service(create);
    cfg.service(destroy);
}

#[get("/me")]
async fn index(pool: Data<PgPool>, at: AccessTokenDecoded) -> Result<Json<Me>, Error> {
    get_me(&**pool, at.into_inner().uid).await.map(Json)
}

#[post("/me")]
async fn create(
    pool: Data<PgPool>,
    at: AccessTokenDecoded,
    form: Json<CreateMe>,
) -> Result<Json<()>, Error> {
    create_me(&**pool, at.into_inner().uid, form.into_inner())
        .await
        .map(Json)
}

#[delete("/me")]
async fn destroy(pool: Data<PgPool>, at: AccessTokenDecoded) -> Result<Json<()>, Error> {
    delete_me(&**pool, at.into_inner().uid).await.map(Json)
}
