use std::collections::HashMap;

/// Each projection field is defined by
/// 1. a definition
/// 1. an alias
/// 1. an output type
///
/// by example `SELECT a.title as title`
///  * `a.title` is the definition
///  * `title` is the field name
///  * the type here is the same as the input type (most likely text)
///
/// Other example: `count(c.*) as comment_count`
///  * `count(c.*)` is the definition
///  * `comment_count` is the field name
///  * type is int as the SQL `count` aggregate function returns an integer.
pub struct ProjectionField {
    /// Field name alias, this is the output name of the field.
    pub name: String,

    /// Field definition. Some field definitions can be fairly complex like `CASE … WHEN …` or using functions.
    pub definition: String,

    /// This indicates the SQL type of the output data.
    pub output_type: String,
}

impl ProjectionField {
    /// [ProjectionField] constructor
    pub fn new(name: &str, definition: &str, output_type: &str) -> Self {
        Self {
            name: name.to_string(),
            definition: definition.to_string(),
            output_type: output_type.to_string(),
        }
    }
}

/// Projection is a definition of field mapping during a query.
/// Fields come from one or several source structures (can be tables, views or
/// sub queries) and are mapped to a Provider query as output.
pub struct Projection {
    fields: Vec<ProjectionField>,
}

impl Projection {
    /// Instanciate a new Projection
    pub fn new(fields: Vec<ProjectionField>) -> Self {
        Self { fields }
    }

    /// Add a new field to the definition. This is one of the projection
    /// building tool to create a projection out of an existing structure.
    /// This is a blanket implementation.
    pub fn add_field(&mut self, field_name: &str, definition: &str, output_type: &str) {
        self.fields.push(ProjectionField {
            name: field_name.to_string(),
            definition: definition.to_string(),
            output_type: output_type.to_string(),
        })
    }

    /// Returns the list of the ProjectionFields of this Projection.
    pub fn get_fields(&self) -> &Vec<ProjectionField> {
        &self.fields
    }

    /// Turn the Projection into a string suitable for use in SQL queries.
    pub fn expand(&self, aliases: HashMap<String, String>) -> String {
        let mut fields: String = self
            .get_fields()
            .iter()
            .map(|field| format!("{} as {}", field.definition, field.name))
            .collect::<Vec<String>>()
            .join(", ");

        for (alias, source) in aliases {
            fields = fields.replace(&alias, &source);
        }

        fields
    }
}

impl Default for Projection {
    fn default() -> Self {
        Self::new(Vec::new())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn simple_projection() {
        let mut projection = Projection::default();
        projection.add_field("test_id", "{:test:}.test_id", "integer");
        projection.add_field("name", "{:test:}.name", "text");
        projection.add_field("created_at", "{:test:}.created_at", "timestamp");
        projection.add_field("thing_count", "count({:thing:}.*)", "integer");

        let aliases: HashMap<String, String> = [("{:test:}", "pika"), ("{:thing:}", "thing_alias")]
            .into_iter()
            .map(|(a, b)| (a.to_string(), b.to_string()))
            .collect();

        assert_eq!(
            "pika.test_id as test_id, pika.name as name, pika.created_at as created_at, count(thing_alias.*) as thing_count".to_string(),
            projection.expand(aliases)
        )
    }
}
