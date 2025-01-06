CREATE OR REPLACE FUNCTION fetch_user_data(user_id UUID) RETURNS JSONB AS $$
DECLARE
    user_data JSONB;
    posts JSONB;
    assets JSONB;
    categories JSONB;
    personal_data_requests JSONB;
BEGIN
    -- Fetch user details
    SELECT row_to_json(u) INTO user_data
    FROM (
        SELECT first_name, last_name, username, description, birth_date FROM users u WHERE u.id = fetch_user_data.user_id
    ) u;

    -- Fetch posts related to the user
    SELECT jsonb_agg(row_to_json(p)) INTO posts
    FROM (
        SELECT * FROM posts p WHERE p.user_id = fetch_user_data.user_id
    ) p;

    -- Fetch assets related to the user
    SELECT jsonb_agg(row_to_json(a)) INTO assets
    FROM (
        SELECT * FROM assets a WHERE a.user_id = fetch_user_data.user_id
    ) a;

    -- Fetch categories related to the user
    SELECT jsonb_agg(row_to_json(c)) INTO categories
    FROM (
        SELECT c.* FROM categories c
        INNER JOIN users_categories uc ON uc.category_id = c.id
        WHERE uc.user_id = fetch_user_data.user_id
    ) c;

    -- Fetch personal data requests related to the user
    SELECT jsonb_agg(row_to_json(pdr)) INTO personal_data_requests
    FROM (
        SELECT * FROM personal_data_requests pdr WHERE pdr.user_id = fetch_user_data.user_id
    ) pdr;

    -- Combine all the data into a single JSONB object
    RETURN jsonb_build_object(
        'user', user_data,
        'posts', posts,
        'assets', assets,
        'categories', categories,
        'personal_data_requests', personal_data_requests
    );
END;
$$ LANGUAGE plpgsql;
